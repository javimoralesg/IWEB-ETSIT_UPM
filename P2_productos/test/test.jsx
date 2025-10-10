import {render, fireEvent, screen} from '@testing-library/react';
import {allproducts} from "./../src/constants/products.js";

it('loads items eventually', async () => {
  render(<Search theproducts={allproducts} />)

  // Click button
  fireEvent.click(screen.getByText('Buscar'))

  // Wait for page to update with query text
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)
});

/*
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
*/