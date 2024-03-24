const AuthCarousel = ({ img, title, desc }) => {
  return (
    <div className="!flex flex-col items-center justify-center h-full my-12">
      <img src={img} alt="responsive image" className="w-[600px] h-[500px]" />
      <h3 className="text-4xl text-white text-center font-bold"> {title} </h3>
      <p className="mt-5 text-2xl text-white text-center capitalize">{desc}</p>
    </div>
  );
};

export default AuthCarousel;
