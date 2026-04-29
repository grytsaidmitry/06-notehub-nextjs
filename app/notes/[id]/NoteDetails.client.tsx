"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { fetchNoteById, deleteNote } from "@/lib/api";
import css from "./NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes");
    },
    onError: () => {
      toast.error("Failed to delete note.");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note.</p>;

  return (
    <div className={css.wrapper}>
      <button className={css.backButton} onClick={() => router.push("/notes")}>
        Go back
      </button>

      <article className={css.noteCard}>
        <header className={css.header}>
          <div className={css.titleGroup}>
            <h1 className={css.title}>{note.title}</h1>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <button
            className={css.deleteButton}
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </header>

        <p className={css.content}>{note.content}</p>
      </article>
    </div>
  );
}
