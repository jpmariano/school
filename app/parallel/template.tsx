
interface FullPageTemplateProps {
    children: React.ReactNode;
  }
  
  const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
    return (
        <div className="FullPageTemplate">{children}</div>
      )
  };
  export default FullPageTemplate;