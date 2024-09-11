import {Link, useNavigate} from "react-router-dom";
import Header from "../UI/Header";
import styled from "styled-components";
import Logo from "../UI/Logo";
import HomePageCard from "../UI/HomePageCard";
import {useEffect, useRef} from "react";

const Section = styled.section`
  height: ${({height}) => height};
  border-bottom: 0.5px solid var(--color-grey-500);
  margin: 0;
  overflow: hidden;
`;

const TextContainer = styled.div`
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
`;

const Div = styled.div`
  scale: 0.8;
`;

const Slogan = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
  text-align: center;
  font-size: ${({fontSize}) => fontSize};
  font-weight: ${({fontWeight}) => fontWeight};
  width: ${({width}) => width || ""};
`;

const Span = styled.span`
  text-align: center;
  font-size: ${({fontSize}) => fontSize};
  font-weight: ${({fontWeight}) => fontWeight};
  width: ${({width}) => width || ""};
`;

const Button = styled.button`
  padding: 1rem 3rem;
  height: 5rem;
  width: 25rem;
  border-radius: 50px;
  font-size: 2rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  font-weight: bold;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

const SlidersContainer = styled.div`
  height: calc(50vh - 10rem);
  padding-top: 5vh;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100vw;
  height: 45%;
  display: flex;
  transform: ${({move}) => move && `translateX(${move})`};
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  gap: 2rem;
`;

const Footer = styled.footer`
  height: 3.9rem;
  background-color: var(--color-grey-50);
  overflow: hidden;
`;

const FooterContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  font-size: 1.25rem;
  margin-right: 3rem;
  color: var(--color-blue-1);
`;

const FootText = styled.span`
  margin-left: auto;
`;

const LinkOutside = styled(Link)`
  height: 1.25rem;
  width: 1.25rem;
  scale: 2;
  display: flex;
  align-items: center;
`;

function HomePage() {
  const sampleCards = [
    ["An attribute extends an HTML or XML element, changing its behavior or providingmetadata...", "html"],
    ["Metadata contains information about the page. This includes information about styles...", "javascript"],
    ["Use the sectioningelements to create a broad outline for your page content, including...", "html"],
    ["Header represents introductory content, typically a group ofintroductory or navigational...", "webbasic"],
    ["Main represents the dominant content of the body of a document. The main content area consists...", "html"],
    ["Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting...", "webbasic"],
    ["Cross-site HTTP requests are HTTPrequests for resources from a different domain than the...", "css"],
    ["The HTTP cache stores a response associated with a request and reuses thestored response...", "webbasic"],
    ["A cookie (also known as a web cookie or browser cookie) is a small piece of data a server... ", "tailwindcss"],
    ["Cascading Style Sheets is a stylesheet language used to describe the presentation of ... ", "css"],
    ["HTML (HyperText Markup Language) is the mostbasic building block of the Web. It defines... ", "react"],
    ["JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programminglanguage...", "sass"],
    ["React is a library for building user interfaces. React is not a framework – it's not...", "reactrouter"],
    ["The DOM Nodeinterface is an abstract base class upon which many other DOM API objects... ", "tailwindcss"],
    ["The DOM (Document Object Model) is an API thatrepresents and interacts with any HTML...", "tailwindcss"],
    ["The Array object enables storing a collection of multiple items under a singlevariable...", "nodejs"],
    ["The Object type represents one of JavaScript's data types. It is used to store various...", "redux"],
    ["The Function objectprovides methods for functions. In JavaScript, every function is actually...", "reactrouter"],
    ["The Number constructor contains constants and methodsfor working with numbers. Values of other...", "html"],
    ["Symbol is a built-in object whose constructor returns a symbol primitive — also called aSymbol... ", "nodejs"],
    ["An HTTP Range request asks the server to send only a portion of an HTTP message back to a client...", "css"],
    ["The classglobal attribute is a list of the classes of the element, separated by ASCII whitespace...", "html"],
    ["JavaScript Object Notation (JSON) is astandard text-based format for representing structured data... ", "javascript"],
    ["Flexbox is a one-dimensional layout method for arranging items inrows or columns. Items flex (expand)... ", "redux"],
    ["Prototypes are the mechanism by which JavaScript objects inherit features from one another...", "react"],
    ["An attribute extends an HTML or XML element, changing its behavior or providing metadata...", "html"],
    ["Metadata contains informationabout the page. This includes information about styles...", "javascript"],
    ["Use the sectioning elements to create a broad outline for your pagecontent, including...", "html"],
    ["Header represents introductory content, typically a group of introductory or navigational...", "webbasic"],
    ["Mainrepresents the dominant content of the body of a document. The main content area consists...", "html"],
    ["Hypertext Transfer Protocol (HTTP) is anapplication-layer protocol for transmitting...", "webbasic"],
    ["Cross-site HTTP requests are HTTP requests for resources from a different domain thanthe...", "html"],
    ["The HTTP cache stores a response associated with a request and reuses the stored response...", "webbasic"],
    ["A cookie (also knownas a web cookie or browser cookie) is a small piece of data a server... ", "react"],
    ["The Function object provides methods for functions. InJavaScript, every function is actually...", "reactrouter"],
    ["The Number constructor contains constants and methods for working with numbers. Valuesof other...", "nodejs"],
    ["Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol... ", "redux"],
    ["An HTTPRange request asks the server to send only a portion of an HTTP message back to a client...", "sass"],
    ["The class global attribute is a list of theclasses of the element, separated by ASCII whitespace...", "redux"],
    ["JavaScript Object Notation (JSON) is a standard text-based format forrepresenting structured data... ", "react"],
    ["Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex(expand)... ", "sass"],
    ["Prototypes are the mechanism by which JavaScript objects inherit features from one another...", "javascript"],
    ["A cookie(also known as a web cookie or browser cookie) is a small piece of data a server... ", "sass"],
    ["Cascading Style Sheets is a stylesheet language usedto describe the presentation of ... ", "css"],
    ["HTML (HyperText Markup Language) is the most basic building block of the Web. It defines... ", "css"],
    ["JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language...", "webbasic"],
    ["React is a library forbuilding user interfaces. React is not a framework – it's not...", "reactrouter"],
    ["The DOM Node interface is an abstract base class upon which manyother DOM API objects... ", "nodejs"],
    ["The DOM (Document Object Model) is an API that represents and interacts with any HTML...", "html"],
    ["TheArray object enables storing a collection of multiple items under a single variable...", "css"],
    ["The Object type represents one of JavaScript's datatypes. It is used to store various...", "react"]
  ];

  const containerA = useRef(null);
  const sliderA = useRef(null);
  const containerB = useRef(null);
  const sliderB = useRef(null);
  // const containerC = useRef(null);
  // const sliderC = useRef(null);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/app");
  }

  useEffect(function () {
    setInterval(() => {
      if (!containerA.current) return;
      containerA.current.scrollLeft++;

      if (containerA.current.scrollLeft % 320 === 0) {
        const el = sliderA.current.firstElementChild;
        sliderA.current.appendChild(el);
        const paddingLeftStr = window.getComputedStyle(sliderA.current).getPropertyValue("padding-left");
        const paddingLeft = parseInt(paddingLeftStr);
        sliderA.current.style.paddingLeft = paddingLeft + 320 + "px";
      }
    }, 15);
  }, []);

  useEffect(function () {
    setInterval(() => {
      if (!containerB.current) return;
      containerB.current.scrollLeft--;

      if (containerB.current.scrollLeft % 320 === 0) {
        containerB.current.scrollLeft += 320;
        const el = sliderB.current.lastElementChild;
        const firstEl = sliderB.current.firstElementChild;
        sliderB.current.lastElementChild.remove();
        sliderB.current.insertBefore(el, firstEl);

        const paddingRightStr = window.getComputedStyle(sliderB.current).getPropertyValue("padding-right");
        const paddingRight = parseInt(paddingRightStr);
        sliderB.current.style.paddingRight = paddingRight + 320 + "px";
      }
    }, 15);
  }, []);

  // useEffect(function () {
  //   setInterval(() => {
  //     if (!containerC.current) return;
  //     containerC.current.scrollLeft++;

  //     if (containerC.current.scrollLeft % 320 === 0) {
  //       const el = sliderC.current.firstElementChild;
  //       sliderC.current.appendChild(el);
  //       const paddingLeftStr = window.getComputedStyle(sliderC.current).getPropertyValue("padding-left");
  //       const paddingLeft = parseInt(paddingLeftStr);
  //       sliderC.current.style.paddingLeft = paddingLeft + 320 + "px";
  //     }
  //   }, 20);
  // }, []);

  return (
    <>
      <Header homepage={true} />
      <Section height="calc(100vh - 10rem)">
        <TextContainer>
          <Div>
            <Logo homepage={true} />
          </Div>
          <Slogan fontSize="4rem" fontWeight="bolder">
            Exploring Web Dev Tech,
            <br />
            Evolving and Growing Every Day!
          </Slogan>
          <Span fontSize="2rem" fontWeight="300" width="50vw">
            Empower your journey in web development as you learn, document, build, and share insights, while shaping the future of the digital world
            through this lightweight and accessible blog.
          </Span>
          <Button onClick={handleClick}>GET STARTED</Button>
        </TextContainer>
        <SlidersContainer>
          <SliderContainer ref={containerA}>
            <Slider ref={sliderA}>
              {sampleCards.map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SliderContainer>
          <SliderContainer ref={containerB}>
            <Slider ref={sliderB}>
              {sampleCards.reverse().map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SliderContainer>
          {/* <SliderContainer ref={containerC}>
            <Slider ref={sliderC}>
              {sampleCards.map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SliderContainer> */}
        </SlidersContainer>
      </Section>
      <Footer>
        <FooterContainer>
          <FootText>Design and Coded by Jovin Liu</FootText>
          <LinkOutside to="https://github.com/JovinLiu">
            <ion-icon name="logo-github" />
          </LinkOutside>
          <LinkOutside to="https://www.linkedin.com/in/jovin-liu-b173b0128/">
            <ion-icon name="logo-linkedin" />
          </LinkOutside>
        </FooterContainer>
      </Footer>
    </>
  );
}

export default HomePage;
