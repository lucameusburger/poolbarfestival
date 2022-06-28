const generators = [
	{
		"id": "169063dc-f1a2-4381-aa34-303ab31362cc"
	},
	{
		"id": "22cc34bc-8c7c-4c05-abf3-6771f59584ce"
	},
	{
		"id": "4d70fc75-fc61-4041-88b8-c1f3df466693"
	},
	{
		"id": "572b9a45-b693-4b7a-b8b3-06564348878a"
	},
	{
		"id": "64c779f2-a320-4bd1-bebd-5ed63c4f9d78"
	},
	{
		"id": "6996e3e4-aac9-4330-867a-beab7fc6277a"
	},
	{
		"id": "7a0e52c7-14c3-464c-8c3c-8bff14254101"
	},
	{
		"id": "a3a14b17-9cb3-48af-93dc-9446d61f0b1c"
	},
	{
		"id": "adc11ee0-e4d9-4268-94de-73af50ffc5f7"
	},
	{
		"id": "b5648b0b-2d34-4a3c-9d3e-d78fd4c8d3b7"
	},
	{
		"id": "cf87e51d-6d77-41ae-873d-cdaea56d36e7"
	}
]
const basepath = "exp://192.168.0.150:19000/--/generator"
generators.forEach((generator) =>
	console.log(basepath + generator.id + "/true")
)

// https://qrexplore.com/generate/results.php
/*
	exp://192.168.0.150:19000/--/generator/169063dc-f1a2-4381-aa34-303ab31362cc/true
	exp://192.168.0.150:19000/--/generator/22cc34bc-8c7c-4c05-abf3-6771f59584ce/true
	exp://192.168.0.150:19000/--/generator/4d70fc75-fc61-4041-88b8-c1f3df466693/true
	exp://192.168.0.150:19000/--/generator/572b9a45-b693-4b7a-b8b3-06564348878a/true
	exp://192.168.0.150:19000/--/generator/64c779f2-a320-4bd1-bebd-5ed63c4f9d78/true
	exp://192.168.0.150:19000/--/generator/6996e3e4-aac9-4330-867a-beab7fc6277a/true
	exp://192.168.0.150:19000/--/generator/7a0e52c7-14c3-464c-8c3c-8bff14254101/true
	exp://192.168.0.150:19000/--/generator/a3a14b17-9cb3-48af-93dc-9446d61f0b1c/true
	exp://192.168.0.150:19000/--/generator/adc11ee0-e4d9-4268-94de-73af50ffc5f7/true
	exp://192.168.0.150:19000/--/generator/b5648b0b-2d34-4a3c-9d3e-d78fd4c8d3b7/true
	exp://192.168.0.150:19000/--/generator/cf87e51d-6d77-41ae-873d-cdaea56d36e7/true
*/