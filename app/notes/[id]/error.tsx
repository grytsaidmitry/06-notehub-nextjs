"use client";

type Props = {
  error: Error;
};

export default function NoteError({ error }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Something went wrong!</h2>
      <p>Could not fetch the note details. {error.message}</p>
    </div>
  );
}
