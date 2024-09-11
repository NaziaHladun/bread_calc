type HeaderProps = {
  setQueryString: (val: string) => void;
};

const Header = ({ setQueryString }: HeaderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(event.target.value);
  };

  return (
    <header>
      <input type="search" placeholder="Search" onChange={handleChange} />
    </header>
  );
};

export default Header;
