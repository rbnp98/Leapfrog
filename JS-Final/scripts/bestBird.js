
const WIDTH = 800;
const HEIGHT = 480;

const FPS = 40;

var bestBird = new Bird();
bestBird.brain.weights_ih.data = [[-0.9586484417999057,-0.5438136385299579,-0.12407295481106173,-0.19806857698260094,0.6297385153615953],[0.8992694068217082,-0.8505723023540015,0.03765044074308177,0.9988239781558494,-0.4132928400584639],[-0.5792237509888913,-0.4108535743585211,0.02066802614663521,0.98888497741321,-0.8032168401151485],[-0.8399164789658675,-0.6481604275586537,0.22594777273227384,-0.5549580729332884,-0.8534093107821166],[-0.017483152480734176,-0.920313502474611,0.9047666827660885,-0.1592162676279525,0.5721870227008696],[0.7735312596228479,-0.736324060714522,-0.9216383017899203,-0.2653790807236116,-0.5979053010516449],[-0.8275076193537476,0.2935482272333094,-0.5604609141435186,0.48789313774310994,-0.807050795747879],[-0.552154869236217,-0.5616609808235355,-0.9562854721954799,0.3061770449417023,-0.13585524614373634]];
bestBird.brain.weights_ho.data = 	[[-0.18689692620114373,0.7970720968045146,0.365982330443297,-0.09011000820336301,0.4774468910885008,0.8074577284901134,-0.7404128355111728,0.396943439436789],[0.8675700397941055,0.5468267428142322,0.1540164927643728,0.46975110864041936,-0.3326012150911506,0.6291847767017185,0.007971529736187755,-0.5647827626924551]];
bestBird.brain.bias_h.data = 	[[-0.929790300458921],[0.3989089522951921],[-0.854479155198022],[0.49306729314996867],[0.2518589622341878],[0.5733286945720151],[-0.7019964908433609],[0.6485810841074464]];
bestBird.brain.bias_o.data = [[-0.15118608481913842],[0.50639903493235]];

console.log(bestBird);

