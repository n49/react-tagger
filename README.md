# react-tagger
###### Dead Simple Tag Input Component
![](http://i.imgur.com/54SO0GR.gif)

### Install now
```

```

### API

| Prop          | Type          | Default  | Description
| ------------- | ------------- | -----    | -------------
| tags          | Array         | []       | All available tags
| value         | Array         | []       | Currently *selected* tags
| deleteIconURL | String        | -       | Path to the icon that goes to the left side of the tag (delete button)
| onChange      | Function      | -       | Callback function that is called every time tag selection changes

### Styling

By default the plugin has no styling, if you want to have some styling please refer to `example/index.css` and modify it to your needs.

### You want to help

###### Please help to make it better! :octocat:

To run the example with hot reload (+ hot reload of actual plugin code)
```
npm run dev-example
```
To build examples:
```
npm run build-example
```
###### To build just the plugin
```
npm run build
```
##### Modifying `dist/*` is :-1:. Modifying `src/*` is :+1:. Note, I will not accept pull requests with any changes in `dist` folder.

### TODO
- Ability to add custom tags
- Make plugin more flixible (more control with different props)
- Add propTypes
