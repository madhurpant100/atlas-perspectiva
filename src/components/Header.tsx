import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent tracking-tight">
        Atlas
      </h1>
      <p className="text-base text-muted-foreground">
        AI-powered analytics assistant for your business data
      </p>
    </header>
  );
};

export default Header;