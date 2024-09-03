import styled, {keyframes} from "styled-components";

const rotateA = keyframes`
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
`;

const rotateB = keyframes`
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
`;

const Spinner = styled.div`
  width: 8rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 13px solid var(--color-blue-1);
  animation: ${rotateA} 0.8s infinite linear alternate, ${rotateB} 1.6s infinite linear;
  position: absolute;
  top: 30rem;
  left: 40%;
`;

const FullScreen = styled.div`
  position: relative;
  height: 100%;
  width: 150rem;
`;

function Loader() {
  return (
    <FullScreen>
      <Spinner />
    </FullScreen>
  );
}

export default Loader;
