import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface NewsForm {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

interface NewsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: NewsForm;
  setForm: React.Dispatch<React.SetStateAction<NewsForm>>;
  isUploading: boolean;
  onUpload: (files: FileList) => void;
  onSubmit: () => void;
  dialogTitle?: string;
  dialogDescription?: string;
  submitButtonText?: string;
  triggerButton?: React.ReactNode;
}

const NewsDialog: React.FC<NewsDialogProps> = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  isUploading,
  onUpload,
  onSubmit,
  dialogTitle = "News Article",
  dialogDescription = "",
  submitButtonText = "Save",
  triggerButton,
}) => {
  const isFormValid =
    form.title.trim() &&
    form.subtitle.trim() &&
    form.content.trim() &&
    form.image.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div>
            <Label>Image</Label>
            <Input type="file" onChange={(e) => onUpload(e.target.files!)} />
            {isUploading && (
              <p className="text-sm text-muted-foreground">
                Uploading image...
              </p>
            )}
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 rounded-md object-contain"
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={isUploading || !isFormValid}>
              {isUploading ? "Loading..." : submitButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDialog;
