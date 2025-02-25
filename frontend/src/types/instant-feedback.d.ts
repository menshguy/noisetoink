declare module 'instant-feedback' {
  interface FeedbackWidgetProps {
    label: string;
    icon?: string;
    text?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    prefillEmail?: string;
    formId: string;
    containerstyle?: Record<string, string>;
  }

  const FeedbackWidget: React.FC<FeedbackWidgetProps>;
  export default FeedbackWidget;
}
