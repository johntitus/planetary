var planetary = require('../lib/index');

describe("Planetary", function(){

	it('return an array with two alignments using the default maxSeparation', function(){
		var date = new Date(2015, 2, 17, 11);
		var alignments = planetary.alignments( date );
		alignments.length.should.equal(2);
	});

	it('return an array with one alignment if the maxSeparation is set', function(){
		var date = new Date(2015, 2, 17, 11);
		var maxSeparation = 1;
		var alignments = planetary.alignments( date, maxSeparation );
		alignments.length.should.equal(1);
	});
});