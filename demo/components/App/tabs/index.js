import E404 from './404';
import E404Tools from './404/Tools';
import Diagram from './Diagram';
import DiagramTools from './Diagram/Tools';
import SimpleDiagram from './SimpleDiagram';
import SimpleDiagramTools from './SimpleDiagram/Tools';
var tabTypes = {
    404: {
        component: E404,
        drawers: {
            tools: E404Tools
        }
    },
    diagram: {
        component: Diagram,
        drawers: {
            tools: DiagramTools
        }
    },
    simpleDiagram: {
        component: SimpleDiagram,
        drawers: {
            tools: SimpleDiagramTools
        }
    },
};
export default tabTypes;
