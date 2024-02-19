import styled from "styled-components"
import MainCanvas from "./components/MainCanvas";
import { RecoilRoot } from "recoil";


function App() {

  return (
    <RecoilRoot>
      <Conainer>
        <MainCanvas/>
      </Conainer>
    </RecoilRoot>
   
  );
}

export default App

const Conainer = styled.div`
  width:100vw;
  height:100vh;
  overflow: hidden;
`;