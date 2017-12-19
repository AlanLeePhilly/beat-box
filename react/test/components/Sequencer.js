import Sequencer from '../../src/components/Sequencer';

describe('Sequencer', () =>{
  let wrapper;

  beforeEach(()=>{
    wrapper = mount(
      <Sequencer />
    );
  });

  it('should render a label tags with the appropriate attributes', () => {
    expect(wrapper.find('.Sequencer').length).toBe(1);
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(2);
  })

  it('should render select tags with the appropriate attributes', () => {
    expect(wrapper.find('select').length).toBe(4);
    expect(wrapper.find('.rootNote').length).toBe(1);
    expect(wrapper.find('.octave').length).toBe(1);
    expect(wrapper.find('.scale').length).toBe(1);
  })



 });
