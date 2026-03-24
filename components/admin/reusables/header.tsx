const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-start">
      <h1 className="text-xl font-semibold ">{title}</h1>
    </div>
  );
};

export default Header;
