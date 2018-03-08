import Sequencer from '../../src/components/sequencer/Sequencer';

xdescribe('Sequencer', () =>{
  let wrapper;
  beforeEach(()=>{
    var data = {
      noteNames: ["A", "A#", "B"],
      pattern: [[1,0,0],[0,1,0],[0,0,1]],
      playing: false,
      steps: 8,
      currentStep: 0,
      noteNames: [''],
      bpm: 98,
      release: 100,
      device: 'synth'
    }
    wrapper = mount(
      <Sequencer
      data={data}/>
    );
  });

  it('should render a label tags with the appropriate attributes', () => {
    expect(wrapper.find('.Sequencer').length).toBe(1);
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
  })

  it('should render select tags with the appropriate attributes', () => {
    expect(wrapper.find('select').length).toBe(1);

  })

 });
