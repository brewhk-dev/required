# required
Utility package to facilitate consistent user experience for required fields on forms.

### Usage

Add the package via Atmosphere.

    meteor add brewhk:required

`brewhk:required` provides the `Required` object with two functions - `checkClass` and `highlightByClass`

If you want to check, within the current template, whether all input fields with the class `brew__required` are all filled in, run `Required.checkClass`

##### `checkClass`

Checks that all elements within the template instance with the specified class are filled in, otherwise return an array of all elements which are not filled-in.

<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Mandatory</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>className</td>
    <td>string</td>
    <td>Yes</td>
    <td>The name of the class to check for</td>
  </tr>
  <tr>
    <td>templateInstance</td>
    <td>Object</td>
    <td>No</td>
    <td>A Meteor template instance to check in. If none is provided, the entire document is checked</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>No</td>
    <td>An optional callback which will be passed `true` if all elements validate, or `false` and the array of failed elements as the first and second parameters, respectively.</td>
  </tr>
</table>

##### `highlightByClass`

Checks that all elements within the template instance with the specified class are filled in, otherwise add a class to those which are not filled in.

<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Mandatory</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>className</td>
    <td>string</td>
    <td>Yes</td>
    <td>The name of the class to check for</td>
  </tr>
  <tr>
    <td>errorClass</td>
    <td>string</td>
    <td>Yes</td>
    <td>The name of the error class to add if the required field is not filled in</td>
  </tr>
  <tr>
    <td>templateInstance</td>
    <td>Object</td>
    <td>No</td>
    <td>A Meteor template instance to check in. If none is provided, the entire document is checked</td>
  </tr>
</table>

### Example

    // Inside template helper or events handler
    let thisTemplate = Template.instance();
    Required.checkClass('brew__required', thisTemplate, function (success) {
        if(success) {
          // All fields are filled in
      } else {
            // Some / All fields are missing
          thisTemplate.$('.errorMsg').eq(0).append('Please ensure all fields are completed.');

          // Optionally, add the `errorInput` class to any required elements which are not filled in
          Required.highlightByClass('brew__required', 'errorInput', thisTemplate);
      }
    });