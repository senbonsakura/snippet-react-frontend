import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Yup from 'yup';
import { startGetOptions } from '../actions/snippet';
import  SelectField from './FormSelect';

class SnippetForm extends Component {
  state = {};
  componentWillMount () {
    this.props.getOptions();
  }
  render () {

    return (
      <div>

        <Formik
          validationSchema={Yup.object().shape({
            code: Yup.string().required('Please enter your code'),
            //language: Yup.string().required('Please select a language'),
            //style: Yup.string().required('Please select a style')
          })}
          initialValues={{
            title: this.props.snippet ? this.props.snippet.title : '',
            code: this.props.snippet ? this.props.snippet.code : '',
            linenos: this.props.snippet ? this.props.snippet.linenos :false,
            language: this.props.snippet ? this.props.snippet.language : '',
            style: this.props.snippet ? this.props.snippet.style : ''

          }}
          onSubmit={(values, {setFieldError, setSubmitting}) => {
            if (!values.code) {
              this.setState(() => {
                setFieldError('code', 'Please enter your code');
              });

            } else {

              this.props.onSubmit({
                title: values.title,
                code: values.code,
                linenos: values.linenos,
                language: values.language,
                style: values.style

              });
            }

            setSubmitting(false);
          }}
          render={({values, touched, errors, dirty, isSubmitting, handleChange}) => (
            <Form className="form">
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <Field
                  type="text"
                  name="title"
                  autoFocus
                  className="form-control"
                  placeholder="Title"
                  id="title"
                />
                {touched.title && errors.title && <p className="form__error">{errors.title}</p>}


              </div>
              <div className="form-group">
                <label htmlFor="code">Code</label>

                <Field
                  component="textarea"
                  rows="20"
                  name="code"
                  className="form-control"
                  placeholder="Enter your code"
                  id="code"

                />
                {touched.code && errors.code && <p className="form__error">{errors.code}</p>}
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="linenos"
                    className="form-check-input"
                    checked={values.linenos}
                  />{"Line Numbers"}
                </label>
              </div>


              {this.props.options &&
                <div>
              <div className="form-group">
                <label htmlFor="language">Title</label>
                <Field name={'language'} component={SelectField} options={this.props.options.language} />

              </div>

              <div className="form-group">
                <label htmlFor="style">Title</label>
                <Field name={'style'} component={SelectField} options={this.props.options.style} />

              </div>
                </div>
              }
              <button disabled={isSubmitting} type="submit" className="btn btn-primary">Save Snippet</button>


            </Form>
          )}
        >

        </Formik>
      </div>

    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    options: state.snippets.options
  }};
const mapDispatchToProps = (dispatch) => ({
  getOptions: ()=> dispatch(startGetOptions())

});
export default connect(mapStateToProps,mapDispatchToProps)(SnippetForm);
