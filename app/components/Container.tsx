'use client';

interface ContainerProps {
  children: React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({ children }) =>{
  return(
    <div
      className="
      max-w-screen-xl mx-auto p-4
      "
    >{children}</div>
  )
}

export default Container;