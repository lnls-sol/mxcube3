import React from 'react';
import { Button } from 'react-bootstrap';
// config exported by webpack at buildtime
// eslint-disable-next-line import/no-unresolved
import config from 'guiConfig';
import MotorInput from '../MotorInput/MotorInput';
import TwoAxisTranslationControl from '../MotorInput/TwoAxisTranslationControl';
import PhaseInput from './PhaseInput';

import '../MotorInput/motor.css';

export default class MotorControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAll: false };
  }

  horVerTranslationAvailable() {
    return this.props.motors.sample_vertical.state !== 0
      && this.props.motors.sample_horizontal.state !== 0;
  }

  renderAllMotors() {
    const {
      phiy,
      phiz,
      focus,
      sampx,
      sampy
    } = this.props.motors;
    const {
      phiyStep,
      phizStep,
      focusStep,
      sampxStep,
      sampyStep
    } = this.props.steps;

    const { save } = this.props;
    const { saveStep } = this.props;
    const { stop } = this.props;

    const phaseControl = (
      <div>
        <p className="motor-name">Phase Control:</p>
        <PhaseInput
          phase={this.props.sampleViewState.currentPhase}
          phaseList={this.props.sampleViewState.phaseList}
          sendPhase={this.props.sampleViewActions.sendCurrentPhase}
        />
      </div>
    );

    return (
      <div>
        <div className="col-sm-12">
          <MotorInput
            save={save}
            value={phiz.position}
            saveStep={saveStep}
            step={phizStep}
            motorName="PhiZ"
            label="X:"
            suffix="mm"
            decimalPoints="3"
            state={phiz.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        <div className="col-sm-12">
          <MotorInput
            save={save}
            value={phiy.position}
            saveStep={saveStep}
            step={phiyStep}
            motorName="PhiY"
            label="Y:"
            suffix="mm"
            decimalPoints="3"
            state={phiy.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        <div className="col-sm-12">
          <MotorInput
            save={save}
            value={focus.position}
            saveStep={saveStep}
            step={focusStep}
            motorName="Focus"
            label="Z:"
            suffix="mm"
            decimalPoints="3"
            state={focus.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        <div className="col-sm-12">
          <MotorInput
            save={save}
            value={sampx.position}
            saveStep={saveStep}
            step={sampxStep}
            motorName="SampX"
            label="Samp-X:"
            suffix="mm"
            decimalPoints="3"
            state={sampx.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        <div className="col-sm-12">
          <MotorInput
            save={save}
            value={sampy.position}
            saveStep={saveStep}
            step={sampyStep}
            motorName="SampY"
            label="Samp-Y:"
            suffix="mm"
            decimalPoints="3"
            state={sampy.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        <div className="col-sm-12">
          {config.phaseControl ? phaseControl : null }
        </div>
      </div>
    );
  }

  renderTranslationCross() {
    const { save } = this.props;
    const { saveStep } = this.props;
    const { stop } = this.props;

    return (
      <div>
        <div style={{ marginLeft: '15px' }}>
          <TwoAxisTranslationControl
            save={save}
            saveStep={saveStep}
            motors={this.props.motors}
            motorsDisabled={this.props.motorsDisabled}
            steps={this.props.steps}
            stop={stop}
          />
        </div>
        { this.state.showAll
          ? (
            <div>
              { this.renderAllMotors() }
              <Button
                style={{ marginLeft: '8px', width: '145px' }}
                onClick={() => { this.setState({ showAll: false }); }}
              >
                <i className="fa fa-cogs" />
                {' '}
Hide motors
                <i className="fa fa-caret-up" />
              </Button>
            </div>
          )
          : (
            <Button
              style={{ marginTop: '1em', marginLeft: '8px', width: '145px' }}
              onClick={() => { this.setState({ showAll: true }); }}
            >
              <i className="fa fa-cogs" />
              {' '}
Show motors
              <i className="fa fa-caret-down" />
            </Button>
          )
        }
      </div>
    );
  }

  render() {
    const {
      phi,
      kappa,
      kappa_phi
    } = this.props.motors;
    const {
      phiStep,
      kappaStep,
      kappaphiStep
    } = this.props.steps;

    const { save } = this.props;
    const { saveStep } = this.props;
    const { stop } = this.props;

    return (
      <div className="row">
        <div className="col-sm-12">
          <MotorInput
            save={save}
            saveStep={saveStep}
            step={phiStep}
            value={phi.position}
            motorName="Phi"
            label="Omega:"
            suffix="&deg;"
            decimalPoints="2"
            state={phi.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>

        <div className="col-sm-12">
          <MotorInput
            save={save}
            saveStep={saveStep}
            step={kappaStep}
            value={kappa.position}
            motorName="Kappa"
            label="Kappa:"
            suffix="&deg;"
            decimalPoints="2"
            state={kappa.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>

        <div className="col-sm-12">
          <MotorInput
            save={save}
            saveStep={saveStep}
            step={kappaphiStep}
            value={kappa_phi.position}
            motorName="Kappa_phi"
            label="Phi:"
            suffix="&deg;"
            decimalPoints="2"
            state={kappa_phi.state}
            stop={stop}
            disabled={this.props.motorsDisabled}
          />
        </div>
        { this.horVerTranslationAvailable()
          ? this.renderTranslationCross() : this.renderAllMotors()
            }
      </div>
    );
  }
}
