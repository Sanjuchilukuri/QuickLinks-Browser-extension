import { useContext } from "react";
import { LinksContext } from "../context/LinksContext";

export default function UseLinks(){
    return useContext(LinksContext);
}