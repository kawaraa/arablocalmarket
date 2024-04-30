"use client";
import { Component } from "react";
import TransitionContainer from "../../(layout)/transition-container";
import Loader from "../../(layout)/loader";
import SvgIcon from "./svg-icon";
import { IconButton } from "./button";

export default class Message extends Component {
  remove = (id) => {
    this.props.setMessages(this.props.messages.filter((item) => item.id != id));
  };

  componentDidUpdate(prevProps) {
    if (this.props.messages.length > prevProps.messages.length) {
      const msg = this.props.messages[this.props.messages.length - 1];
      msg.id = crypto.randomUUID();
      setTimeout(() => this.remove(msg.id), msg.duration * 1000);
    }
  }

  render() {
    return (
      <TransitionContainer
        Tag="div"
        className="z-10 fixed top-0 left-1/2 max-w-[80%] md:max-w-[50%] -translate-x-1/2 flex flex-col justify-center select-none"
        base="flex items-start card bg-bg dark:bg-dcbg mt-3 py-2 px-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg duration-300 "
        enter="-translate-y-12 opacity-0"
        exit="-translate-y-12 opacity-0"
        time="300">
        {this.props.messages.map((msg, i) => (
          <div key={i}>
            {msg.type == "loading" ? (
              <Loader size="18" />
            ) : (
              content[msg.type] && (
                <span className={`w-5 mt-[2px] text-bg rounded-full ${content[msg.type].cls}`}>
                  <SvgIcon name={content[msg.type].icon} />
                </span>
              )
            )}
            <div dir="auto" className="flex-1 mx-2">
              {msg.text}
            </div>
            <IconButton icon="crossMark" cls="w-5" onClick={() => this.remove(msg.id)} />
          </div>
        ))}
      </TransitionContainer>
    );
  }
}

const content = {
  warning: { icon: "warning", cls: "p-[3px] bg-orange" },
  success: { icon: "checkMark", cls: "p-[2px] bg-green" },
  error: { icon: "crossMark", cls: "p-[5px] bg-red" },
};
