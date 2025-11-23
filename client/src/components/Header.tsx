import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-attendo-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-attendo-primary rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16L5 12L6.41 10.59L9 13.17L17.59 4.58L19 6L9 16Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-attendo-text">Attendo</h1>
              <p className="text-xs text-gray-500">Track presence</p>
            </div>
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/signin"
              className="text-attendo-text hover:text-attendo-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signout"
              className="text-attendo-text hover:text-attendo-primary transition-colors"
            >
              Sign Out
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


