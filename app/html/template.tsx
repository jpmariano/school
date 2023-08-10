
interface FullPageTemplateProps {
    children: React.ReactNode;
  }
  
  const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
    return (
        <div id="FullPageTemplate">{children}</div>
      )
  };
  export default FullPageTemplate;