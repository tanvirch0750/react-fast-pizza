import { ReactNode } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

type ILinkButtonProps = {
  children: ReactNode;
  to: string;
};

function LinkButton({ children, to }: ILinkButtonProps) {
  const navigate: NavigateFunction = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
