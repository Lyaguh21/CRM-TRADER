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
import { useUserStore } from "../../../entities/stores/userStore";
import { CurrencyArray } from "../../../entities/Currency";

export default function ModalPushCurrency({
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
  const { userID } = useUserStore();
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
      .post(`${API}/till?tgId=${userID}`, {
        TillType: "Push",
        ValueType: form.values.currency,
        Count: Number(form.values.amount),
        Rate: form.values.amount ? Number(form.values.amount) : 0,
      })
      .then(
        () =>
          notifications.show({
            title: "Успешно",
            message: "Средства были добавлены",
            position: "bottom-center",
            color: "green",
            autoClose: 3000,
          }),
        setChange(!change)
      )
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Что-то пошло не так",
          position: "bottom-center",
          color: "red",
          autoClose: 3000,
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
      title="Пополнение средств"
      onClose={handleClose}
      opened={opened}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            withAsterisk
            allowDeselect={false}
            size="lg"
            label="Валюта"
            placeholder="Выберите валюту"
            data={CurrencyArray}
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
              Отправить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
