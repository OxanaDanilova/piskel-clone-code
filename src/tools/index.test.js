/* import piskel from './index'; */

import defineUserUnit from './index';

// defineUserUnit = (x, y, canvasSize)


/* function sum(a, b) {
  return a + b;
} */

test('test utils', () => {
  expect(defineUserUnit(700, 700, 32)).toEqual(30, 30);
});


/* describe('piskel.extractClipNames', () => {
  it('Should be an instance of Function', () => {
    expect(piskel.extractClipNames).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      titles: [
        'Another video',
        'Video',
      ],
    };
    piskel.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });


  it('Should return array of string that constains clip titles', () => {
    const data = 12321;
    const i = 1;
    const result = piskel.fhgfhfh(data, i);
    expect(result).toEqual(['title 1', 'title 2']);
  });

test('test utils', ()=> {
  expect(draw([], drawOnCanvas)).toBe(3);
})

}); */
