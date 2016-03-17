import { fromJS, Map } from 'immutable';
import { addDataToFirebase } from 'test/utils';

describe('Immutable Operations', () => {
	describe('jasmine-immutablejs-matchers', () => {
		it("should confirm Immutability", function() {
			var data = Map({ 'a': 1, 'b': 2 });
			expect(data).toBeImmutable();
		});

		it("should confirm equality/inequality", () => {
			var data = Map({ 'a': 1, 'b': 2 });
			expect(data).toEqualImmutable(data);

			var obj = { 'a': 1, 'b': 2 };
			var data = Map(obj);
			expect(data).not.toEqualImmutable(obj);
		});
	});

	describe('fromJS and toObject', () => {
		const item = { a: 1, b: 2 };

		it('should convert object from firebase to map by fromJS', () => {
			const firebase = new MockFirebase();
			const record = addDataToFirebase(item, firebase);

			expect(fromJS(record)).toEqualImmutable(Map({...item, key: record.key }));
		});

		it('should convert Immutable object to JS object by toObject', () => {
			const record = Map(item);
			expect(record.toObject()).toEqual(item);
		});
	});

});
