import {
  Modal,
  Select,
  Button,
  Group,
  Stack,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { API } from "../../../app/helpers";
import { notifications } from "@mantine/notifications";

export default function ModalPullCurrency({
  opened,
  close,
  setChange,
  change,
}: {
  opened: boolean;
  close: () => void;
  //@ts-ignore
  setChange: any;
  change: boolean;
}) {
  const form = useForm({
    initialValues: {
      currency: "",
      amount: "",
      rate: "",
    },
    validate: {
      currency: (value) => (!value ? "Выберите валюту" : null),
      amount: (value) => {
        if (!value) return "Введите сумму";
        if (Number(value) <= 0) return "Сумма должна быть больше 0";
        return null;
      },
    },
  });

  const handleSubmit = () => {
    axios
      .post(`${API}/till`, {
        TillType: "Pull",
        ValueType: form.values.currency,
        Count: Number(form.values.amount),
        Rate: form.values.amount ? Number(form.values.amount) : 0,
      })
      .then(
        () =>
          notifications.show({
            title: "Успешно",
            message: "Средства были вычтены",
            position: "bottom-center",
            color: "green",
            autoClose: 1000,
          }),
        setChange(!change)
      )
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Что-то пошло не так",
          position: "bottom-center",
          color: "red",
          autoClose: 1000,
        })
      );

    close();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <Modal
      title="Вывод средств"
      onClose={handleClose}
      opened={opened}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            withAsterisk
            size="lg"
            label="Валюта"
            placeholder="Выберите валюту"
            data={[
              { value: "RUB", label: "RUB - Российский рубль" },
              { value: "USD", label: "USD - Доллар США" },
              { value: "USDT", label: "USDT - Tether" },
            ]}
            {...form.getInputProps("currency")}
          />

          <NumberInput
            withAsterisk
            size="lg"
            label="Сумма"
            placeholder="Введите сумму"
            min={0}
            step={1}
            {...form.getInputProps("amount")}
          />

          <NumberInput
            size="lg"
            label="Курс"
            placeholder="Введите курс"
            min={0}
            step={0.01}
            {...form.getInputProps("rate")}
          />

          <Group mt="md">
            <Button size="lg" variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button size="lg" type="submit">
              Вывести
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
