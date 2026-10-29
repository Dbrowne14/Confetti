export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
};
