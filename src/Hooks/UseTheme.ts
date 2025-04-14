import { useContext } from "react";
import {ThemeContext} from "../context/ThemeContext";

export function UseTheme(){
    return useContext(ThemeContext);
}