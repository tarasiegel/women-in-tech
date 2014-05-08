var toggleOn = true;
var overlayOn = false;

function changeDataView(type){
	if (type == "chartOption"){
		scatterMode = true;
		changeXAxis("Total Employees");
	}
	else {
		scatterMode = false;
		drawLineChart("Total Employees");
	}
}

$(document).ready(function(){
	$("#buttonForwardOne").click(function(){ $("#stepOne").css("display", "none"); $("#chartContainer").css("display", "inherit"); $("footer").css("margin-top", "170px"); drawCategoryChart();});
	$('.overlay').click(function(){ $('.overlay').css("display", "none"); overlayOn = false;});
	$('.overlayContent').click(function(){ $('.overlay').css("display", "none"); overlayOn = false;});
});

function drawCategoryChart(){
	$("#chartContainer").empty();
	var svg = dimple.newSvg("#chartContainer", 1030, 680);
	d3.json("https://dl.dropboxusercontent.com/u/23549740/techCompanies.json", function(data){
	  
	  // Draw the main chart
	  var bubbles = new dimple.chart(svg, data);
	  bubbles.setBounds(65, 70, 755, 510);
	  var bX = bubbles.addMeasureAxis("x", "Total Employees");
	  var bY = bubbles.addMeasureAxis("y", "Percent Female Engineers");
	  bX.colors = ["#DA9694", "#FABF8F", "#C4D79B"];
	  bY.overrideMax = 100;
	  bY.showGridLines = false;
	  bubbles.titleShape = "Women in Software Engineering";
	  bubbles.addMeasureAxis("z", "Total Engineers");
	  bubbles.addSeries(["Company", "Location", "Category",], dimple.plot.bubble)
	  var legend = bubbles.addLegend(967, 65, 60, 500, "Right");

	  bubbles.draw();

	  bubbles.legends = [];

	  	//Title
	  	svg.selectAll("title_text")
	        .data(["Women in Software Engineering"])
	        .enter()
	        .append("text")
	        .attr("x", 500)             
	        .attr("y", 28)
	        .attr("text-anchor", "middle")
	        .style("font-weight", "bold")
	        .style("font-size", "35px")  
	        .text(function (d) { return d; });

	     svg.selectAll("title_text")
	        .data(["A Visualization of Inequality"])
	        .enter()
	        .append("text")
	        .attr("x", 500)             
	        .attr("y", 56)
	        .attr("text-anchor", "middle")
	        .style("font-weight", "bold")
	        .style("font-size", "20px")  
	        .text(function (d) { return d; });

		//Categories
	    svg.selectAll("title_text")
	                  .data(["Toggle the categories:"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 830)
	                  .attr("y", function (d, i) { return 75 + i * 14; })
	                  .style("font-size", "15px")
	                  .style("stroke", "Pink")
	                  .text(function (d) { return d; });

	    svg.selectAll("toggleAllOff")
	                  .data(["All On/Off"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 857)
	                  .attr("y", function (d, i) { return 402.6 + i * 14; })
	                  .style("font-size", "14.57px")
	                  .style("shape-rendering", "crispedges")
	                  .style("color", "Black")
	                  .text(function (d) { return d;});
	    svg.selectAll("toggleAllOff")
	      			  .data(["Toggle All"])
	      			  .enter()   		  
	         		  .append("rect")
	                  .attr("x", 837)
	                  .attr("y", function (d, i) { return 392.6 + i * 14; })
	                  .attr('height', 10)
	                  .attr('width', 16)
	                  .style("fill", "black")
	                  .on("click", function (d) { return toggleAll()});
		
		//Switch X-Axis
	    svg.selectAll("title_text")
	                  .data(["Compare as:"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 830)
	                  .attr("y", function (d, i) { return 435 + i * 14; })
	                  .style("font-size", "15px")
	                  .style("stroke", "Pink")
	                  .text(function (d) { return d; });             

	    svg.selectAll("contentToggle")
	                  .data(["Funding", "Employee Size"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 857)
	                  .attr("y", function (d, i) { return 456.6 + i * 21.6; })
	                  .style("font-size", "14.57px")
	                  .style("shape-rendering", "crispedges")
	                  .style("color", "Black")
	                  .text(function (d) { return d; });
	     svg.selectAll("fundingRect")
	      			  .data(["Toggle All"])
	      			  .enter()   		  
	         		  .append("rect")
	                  .attr("x", 837)
	                  .attr("y", function (d, i) { return 445.5 + i * 14; })
	                  .attr("id", function (d, i) { return "fundingRect"; })
	                  .attr('height', 10)
	                  .attr('width', 16)
	                  .style("fill", "white")
	                  .style("opacity", 0.2)
	                  .on("click", function (d) { return changeXAxis("Funding")});       
	    svg.selectAll("employeeRect")
	      			  .data(["Toggle All"])
	      			  .enter()   		  
	         		  .append("rect")
	                  .attr("x", 837)
	                  .attr("y", function (d, i) { return 467.1 + i * 14; })
					  .attr("id", function (d, i) { return "employeeRect"; })
	                  .attr('height', 10)
	                  .attr('width', 16)
	                  .style("fill", "white")
	                  .style("opacity", 0.9)
	                  .on("click", function (d) { return changeXAxis("Employees")});       
 		
 		//Info/Back button
		svg.selectAll("info_text")
	                  .data(["Back"])
	                  .enter()
	                  .append("rect")
	                  .attr("x", 837)
	                  .attr("id", "buttonBackFour")
	                  .attr("y", function (d, i) { return 498 + i * 14; })
	                  .on("click", function(d) { $("#chartContainer").css("display", "none"); $("#stepOne").css("display", "inherit"); $("footer").css("margin-top", "33px"); })
	                  .style("font-size", "12px")
	                  .style("cursor", "pointer")
	                  .attr('height', 18)
	                  .attr('width', 25)
	                  .style("fill", "pink")
	                  .text(function (d) { return d; });
	    svg.selectAll("info_text")
	                  .data(["<<"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 840)
	                  .attr("y", function (d, i) { return 511 + i * 21.6; })
	                  .on("click", function(d) { $("#chartContainer").css("display", "none"); $("#stepOne").css("display", "inherit"); $("footer").css("margin-top", "33px");})
	                  .style("font-size", "14.57px")
	                  .style("cursor", "pointer")
	                  .style("shape-rendering", "crispedges")
	                  .style("color", "Black")
	                  .text(function (d) { return d; });

	     svg.selectAll("info_text")
	                  .data(["?"])
	                  .enter()
	                  .append("rect")
	                  .attr("x", 870)
	                  .attr("id", "moreInfo")
	                  .attr("y", function (d, i) { return 498 + i * 14; })
	                  .on("click", function(d) {  
	                  	if (!overlayOn){
	                  		$('.overlay').css("display", "inherit");
	                  		overlayOn = false;
	                  	}
	                  	else {
	                  		$('.overlay').css("display", "none");
	                  		overlayOn = true;
	                  	}})
	                  .style("font-size", "12px")
	                  .style("cursor", "pointer")
	                  .attr('height', 18)
	                  .attr('width', 20)
	                  .style("fill", "pink")
	                  .text(function (d) { return d; });
	    svg.selectAll("info_text")
	                  .data(["?"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 876)
	                  .attr("y", function (d, i) { return 511.5 + i * 21.6; })
	                  .attr("id", "moreInfo")
	                  .on("click", function(d) {  
	                  	if (!overlayOn){
	                  		$('.overlay').css("display", "inherit");
	                  		overlayOn = false;
	                  	}
	                  	else {
	                  		$('.overlay').css("display", "none");
	                  		overlayOn = true;
	                  	}})
	                  .style("font-size", "14.57px")
	                  .style("cursor", "pointer")
	                  .style("shape-rendering", "crispedges")
	                  .style("color", "Black")
	                  .text(function (d) { return d; });

        svg.selectAll("info_text")
	                  .data(["Based off the Data","Collection: Women in","Software Engineering","and CrunchBase.com"])
	                  .enter()
	                  .append("text")
	                  .attr("x", 837)
	                  .attr("y", function (d, i) { return 535 + i * 14; })
	                  .on("click", function(d) { return window.open('https://medium.com/grace-hopper-2013/cb997a57252','_blank');})
	                  .style("font-size", "12px")
	                  .style("cursor", "pointer")
	                  .text(function (d) { return d; }); 
	    function changeXAxis(e){
			if (e == "Funding") {
				bX.measure = "Funding (Mil USD)";
				svg.selectAll("rect#employeeRect").style("opacity", 0.2);
				svg.selectAll("rect#fundingRect").style("opacity", 0.9);
				bubbles.data = dimple.filterData(data, "Category", filterValues);

			}
			else {
				bX.measure = "Total Employees";
				svg.selectAll("rect#employeeRect").style("opacity", 0.9);
				svg.selectAll("rect#fundingRect").style("opacity", 0.2);
				bubbles.data = dimple.filterData(data, "Category", filterValues);
			}	
			bubbles.draw(800);
		}     
	    var filterValues = dimple.getUniqueValues(data, "Category");
	    legend.shapes.selectAll("rect")
	    	.on("click", function (e) {
	            var hide = false;
	            var newFilters = [];
	            filterValues.forEach(function (f) {
	              if (f === e.aggField.slice(-1)[0]) {
	                hide = true;
	              } else {
	                newFilters.push(f);
	              }
	            }); 
	            if (hide) {
	              d3.select(this).style("opacity", 0.2);
	            } else {
	              newFilters.push(e.aggField.slice(-1)[0]);
	              d3.select(this).style("opacity", 0.9);
	            }
	            filterValues = newFilters;
	            bubbles.data = dimple.filterData(data, "Category", filterValues);
	            bubbles.draw(800);
	    	});

		function toggleAll(){
				if (toggleOn) {
		            var newFilters = [];
		            legend.shapes.selectAll("rect").style("opacity", 0.2);
		            filterValues = newFilters;
		            bubbles.data = dimple.filterData(data, "Category", filterValues);
		            bubbles.draw(800);
	    			toggleOn = false;
	    			
	    		}
	    		else {
	    			filterValues = dimple.getUniqueValues(data, "Category");
		            legend.shapes.selectAll("rect").style("opacity", 0.9);
		            bubbles.data = dimple.filterData(data, "Category", filterValues);
		            bubbles.draw(800);
	    			toggleOn = true;
	    			
	    		}
		}
});
}


function drawLineChart(type){
	$("#chartContainer").empty();
	var svg = dimple.newSvg("#chartContainer", 600, 500);
	d3.json("https://dl.dropboxusercontent.com/u/23549740/techCompanies.json", function(data){
		var chart = new dimple.chart(svg, data);
		chart.setBounds(60, 50, 655, 410);
		var x = chart.addCategoryAxis("x", "Company");
		x.addOrderRule(type, 'Desc');
		x.hidden = true;
		chart.addMeasureAxis("y", "Percent Female Engineers");
		chart.addSeries(["Company", "Location"], dimple.plot.bar);
		chart.draw();
	});
}