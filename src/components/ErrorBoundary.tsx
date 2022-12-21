import { Component, ReactComponentElement, ReactElement, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}
interface IState {
  hasError: Boolean;
}
export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log('error = ', error);
    return { hasError: true };
  }

  //   componentDidCatch(error, errorInfo) {
  //     // You can also log the error to an error reporting service
  //   }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Что-то пошло не так</h1>;
    }

    return this.props.children;
  }
}
