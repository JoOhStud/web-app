export class UploadAdapter {
  private loader: any;
  private token: string;

  constructor(loader: any, token: string) {
    this.loader = loader;
    this.token = token;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);

          fetch("/api/blog/upload/", {
            method: "POST",
            body: formData,
            headers: {
              // wstawiamy token do autoryzacji, np. Bearer
              Authorization: `Bearer ${this.token}`,
            },
          })
            .then(async (response) => {
              if (!response.ok) {
                return reject(`Błąd uploadu: ${response.statusText}`);
              }
              const data = await response.json();
              // CKEditor oczekuje: { default: LINK_DO_OBRAZKA }
              resolve({ default: data.url });
            })
            .catch((err) => {
              reject(`Błąd podczas wysyłania pliku: ${err.message}`);
            });
        })
    );
  }

  abort() {
    // Jeśli chcesz obsłużyć ewentualne anulowanie
  }
}
