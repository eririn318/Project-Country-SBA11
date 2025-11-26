interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>Error:{message}</p>
    </div>
  );
}
