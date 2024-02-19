import { useRecoilValue } from "recoil";
import { isEnteredAtom } from "../../stores";
import { useRef } from "react";
import { Scroll } from "@react-three/drei";
import styled from "styled-components";

function MovingDom(){
    const isEntered = useRecoilValue(isEnteredAtom);

    const article01Ref = useRef(null);
    const article02Ref = useRef(null);
    const article03Ref = useRef(null);
    const article04Ref = useRef(null);
    const article05Ref = useRef(null);
    const article06Ref = useRef(null);
    const article07Ref = useRef(null);
    const article08Ref = useRef(null);

    if(!isEntered) return null;

    return(
        <Scroll html>
            <ArticleContainer ref={article01Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article02Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article03Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article04Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article05Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article06Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article07Ref}>

            </ArticleContainer>
            <ArticleContainer ref={article08Ref}>

            </ArticleContainer>
        </Scroll>
    );
}

export default MovingDom;

const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    opacity: 0;
    width:100vw;
    height:100vh;
    background-color:transparent;
    color:#ffffff;
    font-size:24px;
    padding:40px;
`;