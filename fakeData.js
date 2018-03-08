
const makeData = (...arguments) => {
    let data = arguments.length>1 ? arguments[0] : genItem("Defence")
    generateData(data, arguments[arguments.length-1])
    return data.childNodes.length>=3 ? data : makeData.bind(null, data)
}

const generateData = (data, {d=5, b=10, u=5}={}) => {

    let deps, brigs, units, globalIndex = Math.floor(Math.random() * 999)
    const branch = genItem(["Navy", "RAF", "Army"][data.childNodes.length], data)

    deps = Math.max(Math.floor(Math.random()*d), 1)

    // Make divisions
    for (let i=1; i<=deps; i++) {
        const division = genItem(`Division ${globalIndex}`, branch)
        brigs = Math.max(Math.floor(Math.random()*b), 1)

        // Make brigades
        for (let j=1; j<=brigs; j++) {
            const brigade = genItem(`Brigade ${globalIndex}`, division)
            units = Math.max(Math.floor(Math.random()*u), 1)

            // Make units
            for (let k=1; k<=units; k++) {
                brigade.childNodes.push(genItem(`Unit ${globalIndex}`, brigade, {
                    cost: Math.round(Math.random()*10000)/100,
                    staff: Math.floor(Math.random()*100)
                }))
                globalIndex++;
            }
            division.childNodes.push(brigade)
            globalIndex++;
        }
        branch.childNodes.push(division)
        globalIndex++;
    }

    data.childNodes.push(branch)
}

const genItem = (title, parent=0, rest=[]) => {
    return {
        title, parent, ...rest, childNodes: []
    }
}

const fakeData = makeData({d: 6, b: 10, u: 15})({d: 8, b: 20, u: 14})({d: 10, b: 15, u: 13})

const schema = {
    title: "Entity",
    description: "GAMOV entity",
    type: "object",
    properties: {
        label: {
            type: "string",
            description: "Name of specific entity"
        },
        staff: {
            type: "integer",
            minimum: 1,
            description: "Number of staff assigned to this"
        },
        costs: {
            type: "number",
            minimum: 0,
            description: "The total monetary"
        },
        parent: {
            type: "object",
            description: "The containing entity"
        },
        childNodes: {
            type: "array",
            description: "Children entities, where applicable"
        }
    },
    required: ["label", "parent"]
}

