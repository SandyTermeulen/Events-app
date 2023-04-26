import { useToast } from "@chakra-ui/react";
import { Component } from "react";

const toast = useToast();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return toast({
        title: "Event not added.",
        status: "error",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    } else {
      toast({
        title: "Event added succesfully.",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
