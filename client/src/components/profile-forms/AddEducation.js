import react, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from "../../actions/profile";
import {Link, withRouter } from 'react-router-dom';

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school, degree, fieldOfStudy, from, to, current, description} = formData;

    const onChange = e =>setFormData({...formData, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Aadd any lecturers
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* School or bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Sertificate..." name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="study" value={study} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={e => {setFormData({...fromData, current: !current});
                        toggleDisabled(!toggleDisabled);}} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Programm Description"
              value={description}
              onChange={e => onChange(e)}
          ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation);