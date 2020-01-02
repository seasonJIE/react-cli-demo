import * as React from "react";

export default class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      demo: "demo",
    }
  }

  componentDidMount(): void {
    this.setState({demo: "demo123"})
  }

  render() {
    const {demo} = this.state
    return (<>
      {demo}
    </>)
  }
}
