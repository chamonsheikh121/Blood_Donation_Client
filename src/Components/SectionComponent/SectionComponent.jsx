import { UseSectionTransition } from "../../Hooks/UseSectionTransition";

const SectionComponent = ({id, from, isPlus}) => {
   UseSectionTransition(id, from, isPlus)
};

export default SectionComponent;