import { NavigateFunction, useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate: NavigateFunction = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {(error as { data?: string })?.data ||
          (error as Error)?.message ||
          (error as { statusText?: string })?.statusText}
      </p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
