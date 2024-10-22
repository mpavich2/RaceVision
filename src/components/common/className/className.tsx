import styles from './className.module.css';

export function ClassName(props: { className: string; classColor: string }) {
  return (
    <div
      style={{
        backgroundColor: props.classColor || 'white',
      }}
      className={styles.carClassName}
    >
      {props.className}
    </div>
  );
}
