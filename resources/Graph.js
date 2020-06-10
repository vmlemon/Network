module.Graph = ( function (d3) {

	let Graph = function() {
	};

	Graph.prototype.createSimulation = function(container, graph) {
		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function(d) { return d.id; }))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(500, 300));

		let linkGroup = createLinkGroup(container, graph.links);
		let nodeGroup = createNodeGroup(container, graph.nodes);
		let nodeLabels = createNodeLabels(container, graph.nodes);

		simulation.nodes(graph.nodes).on(
			"tick",
			function ticked() {
				updateNodeGroup(nodeGroup);
				updateLinkGroup(linkGroup);

				updateNodeGroup(nodeLabels);
			}
		);

		simulation.force("link").links(graph.links);
	};

	function createLinkGroup(container, links) {
		return container.append("g").attr("class", "links")
			.selectAll("line")
			.data(links)
			.enter()
			.append("line")
			.attr("stroke", "#aaa")
			.attr("stroke-width", "1px");
	}

	function createNodeGroup(container, nodes) {
		let color = d3.scaleOrdinal(d3.schemeCategory10);

		let nodeGroup = container.append("g").attr("class", "nodes")
			.selectAll("g")
			.data(nodes)
			.enter()
			.append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { return color(d.group); });

		nodeGroup.append("title").text(function(d) { return d.id; });

		return nodeGroup;
	}

	function createNodeLabels(container, nodes) {
		return container.append("g").attr("class", "labelNodes")
			.selectAll("text")
			.data(nodes)
			.enter()
			.append("text")
			.text(function(d, i) { return d.id; })
			.style("fill", "#555")
			.style("font-family", "Arial")
			.style("font-size", 12)
			.style("pointer-events", "none")
			.attr('x', 9)
			.attr('y', 4);
	}

	function updateLinkGroup(link) {
		link.attr("x1", function(d) { return fixna(d.source.x); })
			.attr("y1", function(d) { return fixna(d.source.y); })
			.attr("x2", function(d) { return fixna(d.target.x); })
			.attr("y2", function(d) { return fixna(d.target.y); });
	}

	function updateNodeGroup(node) {
		node.attr("transform", function(d) {
			return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
		});
	}

	function fixna(n) {
		if (isFinite(n)) return n;
		return 0;
	}

	return Graph;

}(window.d3) );