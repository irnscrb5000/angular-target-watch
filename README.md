# TargetWatch
Angular service designed to watch for values out of your control, which you know
have to change in the near future and which do so outside of the $digest loop

## Usage:
```
TargetWatch.watch(objectToWatch, 'propertyName', targetValue).then(onComplete);
```
