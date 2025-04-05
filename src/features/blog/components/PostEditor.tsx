import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../blogApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useUploadImageMutation } from "../blogApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { UploadAdapterPlugin } from "../../../utils/uploadAdapterPlugin";

const PostEditor: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.currentUser.token);

  const isEditing = Boolean(postId);
  const { data: post } = useGetPostByIdQuery(Number(postId), {
    skip: !isEditing,
  });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Form state
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const [isDirty, setIsDirty] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadImageMutation, { isLoading: isUploading }] =
    useUploadImageMutation();

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate("/blog");
    }
  };

  const confirmCancel = () => {
    setIsDirty(false);
    setShowCancelDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    } else {
      navigate("/blog");
    }
  };

  const handleSavePost = async () => {
    if (isEditing) {
      await updatePost({
        postId: Number(postId),
        data: { ...post, title, short_description: shortDesc, content },
      });
    } else {
      await createPost({ title, short_description: shortDesc, content });
    }
    navigate("/blog");
  };

  // Load post data when editing
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setShortDesc(post.short_description || "");
      setContent(post.content);
      setIsDirty(false);
    }
  }, [post]);

  useEffect(() => {
    if (title.trim() || shortDesc.trim() || content.trim()) {
      setIsDirty(true);
    }
  }, [title, shortDesc, content]);

  useEffect(() => {
    const handleNavigation = (event: PopStateEvent) => {
      if (isDirty) {
        event.preventDefault();
        setShowCancelDialog(true);
        setPendingNavigation(location.pathname);
        window.history.pushState(null, "", location.pathname); // Prevents actual navigation
      }
    };

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, [isDirty, location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          "Masz niezapisane zmiany. Czy na pewno chcesz opuścić stronę?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        p: 3,
      }}
    >
      <Typography variant="h4">{isEditing ? "Edycja" : "Nowy wpis"}</Typography>
      <TextField
        label="Tytuł"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        label="Krótki opis"
        fullWidth
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        sx={{ my: 1 }}
      />
      {/* <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <Button variant="outlined" component="label">
          Wybierz obrazek
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
        </Button> */}

      {/* <Button
          variant="contained"
          onClick={async () => {
            if (selectedFile) {
              try {
                // jeśli chcesz powiązać obrazek z istniejącym postId:
                const response = await uploadImageMutation({
                  file: selectedFile,
                  postId: postId ? Number(postId) : undefined,
                }).unwrap();
                // wstawiamy tag <img> do CKEditora:
                setContent(
                  (prev) => prev + `<img src="${response.url}" alt="obrazek" />`
                );
                setSelectedFile(null);
              } catch (error) {
                console.error("Błąd przesyłania obrazka:", error);
              }
            }
          }}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? "Trwa wysyłanie..." : "Wyślij obrazek"}
        </Button>
      </Box> */}

      <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        <CKEditor
          activeClass="p10"
          editor={ClassicEditor}
          data={content}
          onChange={(event: any, editor: any) => setContent(editor.getData())}
          onBlur={() => {}}
          config={{
            // Tutaj dopisujemy nasz plugin
            extraPlugins: [UploadAdapterPlugin],
            // (opcjonalnie) Włączamy toolbar do wstawiania obrazków:
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "uploadImage",
              "undo",
              "redo",
            ],
            // ... inne ustawienia
            height: "400px",
          }}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 2 }}
      >
        <Button onClick={handleCancel} variant="outlined" color="error">
          Anuluj
        </Button>
        <Button onClick={handleSavePost} variant="contained">
          {isEditing ? "Zapisz zmiany" : "Zapisz"}
        </Button>
      </Box>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
      >
        <DialogTitle>Niezapisane zmiany</DialogTitle>
        <DialogContent>
          <Typography>
            Masz niezapisane zmiany. Czy na pewno chcesz opuścić stronę?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)} color="primary">
            Zostań
          </Button>
          <Button onClick={confirmCancel} color="error">
            Opuść
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostEditor;
