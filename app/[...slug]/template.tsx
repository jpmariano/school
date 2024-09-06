import AuthProgressWrapper from "@/components/authProgressWrapper";

interface FullPageTemplateProps {
    children: React.ReactNode;
  }
  
  const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
    return (
      <AuthProgressWrapper>
        <div id="FullPageTemplate">{children}</div>
      </AuthProgressWrapper>
        
      )
  };
  export default FullPageTemplate;