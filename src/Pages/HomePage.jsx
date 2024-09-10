import {useNavigate} from "react-router-dom";
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
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const Div = styled.div`
  scale: 0.8;
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
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

const SlidersContainer = styled.div`
  margin-top: 3rem;
`;

const SlideContainer = styled.div`
  width: 100vw;
  height: 14rem;
  display: flex;
  transform: ${({move}) => move && `translateX(${move})`};
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  gap: 2rem;
`;

const Img = styled.img`
  width: 35vw;
  height: auto;
`;

const ColumnDiv = styled.div`
  margin: 10rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  margin: 15rem 0;
  display: flex;
  align-items: center;
  gap: 30rem;
`;
const TextBox = styled.div``;

function HomePage() {
  const sampleCards1 = [
    "Cascading Style Sheets is a stylesheet language used to describe the presentation of ... ",
    "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines... ",
    "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language...",
    "React is a library for building user interfaces. React is not a framework – it's not...",
    "The DOM Node interface is an abstract base class upon which many other DOM API objects... ",
    "The DOM (Document Object Model) is an API that represents and interacts with any HTML...",
    "The Array object enables storing a collection of multiple items under a single variable...",
    "The Object type represents one of JavaScript's data types. It is used to store various..."
  ];

  const sampleCards2 = [
    "An attribute extends an HTML or XML element, changing its behavior or providing metadata...",
    "Metadata contains information about the page. This includes information about styles...",
    "Use the sectioning elements to create a broad outline for your page content, including...",
    "Header represents introductory content, typically a group of introductory or navigational...",
    "Main represents the dominant content of the body of a document. The main content area consists...",
    "Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting...",
    "Cross-site HTTP requests are HTTP requests for resources from a different domain than the...",
    "The HTTP cache stores a response associated with a request and reuses the stored response...",
    "A cookie (also known as a web cookie or browser cookie) is a small piece of data a server... "
  ];

  const sampleCards3 = [
    "The Function object provides methods for functions. In JavaScript, every function is actually...",
    "The Number constructor contains constants and methods for working with numbers. Values of other...",
    "Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol... ",
    "An HTTP Range request asks the server to send only a portion of an HTTP message back to a client...",
    "The class global attribute is a list of the classes of the element, separated by ASCII whitespace...",
    "JavaScript Object Notation (JSON) is a standard text-based format for representing structured data... ",
    "Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand)... ",
    "Prototypes are the mechanism by which JavaScript objects inherit features from one another..."
  ];

  const containerA = useRef(null);
  const sliderA = useRef(null);
  const containerB = useRef(null);
  const sliderB = useRef(null);
  const containerC = useRef(null);
  const sliderC = useRef(null);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/app");
  }

  useEffect(function () {
    function scrollA() {
      setInterval(() => {
        containerA.current.scrollLeft++;

        if (containerA.current.scrollLeft % 320 === 0) {
          const el = sliderA.current.firstElementChild;
          sliderA.current.appendChild(el);
          const paddingLeftStr = window.getComputedStyle(sliderA.current).getPropertyValue("padding-left");
          const paddingLeft = parseInt(paddingLeftStr);
          sliderA.current.style.paddingLeft = paddingLeft + 320 + "px";
        }
      }, 15);
    }
    scrollA();
  }, []);

  useEffect(function () {
    function scrollB() {
      setInterval(() => {
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
      }, 30);
    }
    scrollB();
  }, []);

  useEffect(function () {
    function scrollC() {
      setInterval(() => {
        containerC.current.scrollLeft++;

        if (containerC.current.scrollLeft % 320 === 0) {
          const el = sliderC.current.firstElementChild;
          sliderC.current.appendChild(el);
          const paddingLeftStr = window.getComputedStyle(sliderC.current).getPropertyValue("padding-left");
          const paddingLeft = parseInt(paddingLeftStr);
          sliderC.current.style.paddingLeft = paddingLeft + 320 + "px";
        }
      }, 20);
    }
    scrollC();
  }, []);

  return (
    <>
      <Header homepage={true} />
      <Section height="calc(100vh - 6rem)">
        <TextContainer>
          <Div>
            <Logo homepage={true} />
          </Div>
          <Span fontSize="4rem" fontWeight="bolder">
            Exploring Web Dev Tech,
            <br />
            Evolving and Growing Every Day!
          </Span>
          <Span fontSize="2rem" fontWeight="400" width="50vw">
            Empower your journey in web development as you learn, document, build, and share insights, while shaping the future of the digital world
            through this lightweight and accessible blog.
          </Span>
          <Button onClick={handleClick}>GET STARTED</Button>
        </TextContainer>
        <SlidersContainer>
          <SlideContainer ref={containerA}>
            <Slider ref={sliderA}>
              {sampleCards1.map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SlideContainer>
          <SlideContainer ref={containerB}>
            <Slider ref={sliderB}>
              {sampleCards2.map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SlideContainer>
          <SlideContainer ref={containerC}>
            <Slider ref={sliderC}>
              {sampleCards3.map((card, i) => (
                <HomePageCard key={i} content={card} />
              ))}
            </Slider>
          </SlideContainer>
        </SlidersContainer>
      </Section>
      <Section>
        <ColumnDiv>
          <Row>
            <TextBox>asdasdasdasd</TextBox>
            <Img src="feature1.png" />
          </Row>
          <Row>
            <Img src="feature2.png" />
            <TextBox>asdasdasdasd</TextBox>
          </Row>
          <Row>
            <TextBox>asdasdasdasd</TextBox>
            <Img src="feature3.png" />
          </Row>
          <Row>
            <Img src="feature4.png" />
            <TextBox>asdasdasdasd</TextBox>
          </Row>
        </ColumnDiv>
      </Section>
    </>
  );
}

export default HomePage;
