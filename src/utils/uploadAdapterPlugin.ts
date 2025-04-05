import { UploadAdapter } from "./UploadAdapter";

export function UploadAdapterPlugin(editor: any, token: string) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader, token);
  };
}
