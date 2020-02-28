import connections from 'demo/data/connections';
import diagrams from 'demo/data/diagrams';
import nodes from 'demo/data/nodes';
import sources from 'demo/data/sources';
var defaultState = {
    connections: connections,
    debug: false,
    diagrams: diagrams,
    drawerSettings: {
        docked: true,
        drag: false,
        hover: true,
        index: 0,
        open: true
    },
    drawers: [{
            name: 'tools',
            params: {
                title: 'Tools'
            }
        }, {
            name: 'settings',
            params: {
                title: 'Settings'
            }
        }],
    miscellaneous: {
        shortName: 'jr',
        title: 'jsPlumb React Demo'
    },
    nodes: nodes,
    orientation: 'left',
    selections: [],
    sources: sources,
    tabSettings: {
        index: 1
    },
    tabs: [{
            name: '404',
            params: {
                hidden: true,
                title: '404',
                type: '404'
            },
            sticky: true
        }, {
            deepStateRedirect: true,
            name: 'complexDiagram',
            params: {
                swipe: false,
                title: 'Complex Diagram',
                type: 'diagram'
            },
            sticky: true
        }, {
            deepStateRedirect: true,
            name: 'simpleDiagram',
            params: {
                swipe: false,
                title: 'Simple Diagram',
                type: 'simpleDiagram'
            },
            sticky: true
        }]
};
export default defaultState;
